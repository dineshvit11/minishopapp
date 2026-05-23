import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  InputAdornment,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

import productsData from '../data/products.json';

const Home = () => {

  // =========================
  // STATES
  // =========================

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const [search, setSearch] =
    useState('');

  // =========================
  // NORMALIZE PRODUCTS
  // =========================

  const normalizeProducts = (
    data
  ) => {

    if (Array.isArray(data)) {
      return data;
    }

    if (
      Array.isArray(data?.products)
    ) {
      return data.products;
    }

    if (
      Array.isArray(data?.data)
    ) {
      return data.data;
    }

    if (
      Array.isArray(data?.result)
    ) {
      return data.result;
    }

    return [];
  };

  // =========================
  // IMAGE URL FIX
  // =========================

  const getImageUrl = (image) => {

    // fallback image

    const fallback =
      '/images/shirt.jpg';

    if (!image) {
      return fallback;
    }

    // public folder image fix

    if (
      image.startsWith('/images/')
    ) {

      return `${process.env.PUBLIC_URL}${image}`;
    }

    return image;
  };

  // =========================
  // SAFE NUMBER
  // =========================

  const toNumber = (value) => {

    const number =
      Number(value);

    return Number.isFinite(
      number
    )
      ? number
      : 0;
  };

  // =========================
  // FETCH PRODUCTS
  // =========================

  useEffect(() => {

    const fetchProducts =
      async () => {

        try {

          setLoading(true);

          setError('');

          // fake api delay

          setTimeout(() => {

            const data =
              normalizeProducts(
                productsData
              );

            console.log(
              'Products =>',
              data
            );

            setProducts(data);

            setLoading(false);

          }, 1000);

        } catch (err) {

          console.error(
            'Error fetching products:',
            err
          );

          setError(
            'Products load nahi ho paaye'
          );

          setLoading(false);
        }
      };

    fetchProducts();

  }, []);

  // =========================
  // FILTER PRODUCTS
  // =========================

  const filteredProducts =
    useMemo(() => {

      const query =
        search
          .trim()
          .toLowerCase();

      return products
        .filter((product) => {

          if (!query) {
            return true;
          }

          const productName =
            (
              product.product_name ||
              product.name ||
              ''
            ).toLowerCase();

          const brandName =
            (
              product.brand_name ||
              product.brand ||
              ''
            ).toLowerCase();

          const category =
            (
              product.category ||
              ''
            ).toLowerCase();

          return (

            productName.includes(
              query
            ) ||

            brandName.includes(
              query
            ) ||

            category.includes(
              query
            )
          );
        })
        .slice(0, 25);

    }, [products, search]);

  // =========================
  // DISCOUNT %
  // =========================

  const getDiscountPercent =
    (product) => {

      const price =
        toNumber(
          product.price
        );

      const discountPrice =
        toNumber(
          product.discount_price
        );

      if (
        !price ||
        !discountPrice ||
        discountPrice >= price
      ) {

        return 0;
      }

      return Math.round(
        (
          (price -
            discountPrice) /
          price
        ) * 100
      );
    };

  // =========================
  // LOADING UI
  // =========================

  const renderSkeletons = () =>
    Array.from({
      length: 10,
    }).map((_, index) => (

      <Box
        key={index}
        sx={{
          minWidth: 0,
        }}
      >

        <Card
          sx={{
            width: '100%',
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow:
              '0 10px 26px rgba(15,23,42,0.07)',
          }}
        >

          <Skeleton
            variant="rectangular"
            height={185}
          />

          <CardContent
            sx={{ p: 2 }}
          >

            <Skeleton
              height={28}
            />

            <Skeleton
              width="70%"
            />

            <Skeleton
              width="45%"
            />

            <Skeleton
              height={36}
              sx={{
                mt: 1.5,
              }}
            />

          </CardContent>

        </Card>

      </Box>
    ));

  // =========================
  // UI
  // =========================

  return (

    <Box
      sx={{
        bgcolor: '#f6f7fb',
        minHeight: '100vh',
        py: {
          xs: 3,
          md: 5,
        },
      }}
    >

      <Container maxWidth="xl">

        {/* HEADER */}

        <Box
          sx={{
            mb: 4,
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
            justifyContent:
              'space-between',
            gap: 2,
          }}
        >

          <Box>

            <Typography
              variant="overline"
              sx={{
                color:
                  'primary.main',
                fontWeight: 800,
              }}
            >
              Latest Collection
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                mb: 1,
              }}
            >
              Products
            </Typography>

            <Typography color="text.secondary">
              Discover fresh
              styles, daily deals
              and products.
            </Typography>

          </Box>

          {/* SEARCH */}

          <TextField
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search products"
            sx={{
              width: {
                xs: '100%',
                md: 360,
              },

              '& .MuiOutlinedInput-root':
                {
                  bgcolor:
                    '#fff',
                  borderRadius: 2,
                },
            }}
            InputProps={{
              startAdornment: (

                <InputAdornment position="start">

                  <SearchOutlinedIcon />

                </InputAdornment>
              ),
            }}
          />

        </Box>

        {/* ERROR */}

        {error && (

          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 2,
            }}
          >
            {error}
          </Alert>
        )}

        {/* PRODUCTS */}

        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns:
              {
                xs: '1fr',
                sm: 'repeat(2,1fr)',
                md: 'repeat(3,1fr)',
                lg: 'repeat(5,1fr)',
              },

            gap: 3,
          }}
        >

          {loading
            ? renderSkeletons()
            : filteredProducts.map(
                (product) => {

                  const discountPercent =
                    getDiscountPercent(
                      product
                    );

                  const price =
                    toNumber(
                      product.price
                    );

                  const discountPrice =
                    toNumber(
                      product.discount_price
                    );

                  const salePrice =
                    discountPrice ||
                    price;

                  const productName =
                    product.product_name ||
                    product.name ||
                    'Product';

                  const brandName =
                    product.brand_name ||
                    product.brand ||
                    'MiniShop';

                  const category =
                    product.category ||
                    'General';

                  const stock =
                    toNumber(
                      product.stock
                    );

                  const imageUrl =
                    getImageUrl(
                      product.product_image ||
                        product.image
                    );

                  return (

                    <Box
                      key={
                        product.id ||
                        product._id ||
                        productName
                      }
                    >

                      <Card
                        sx={{
                          height:
                            '100%',

                          minHeight: 410,

                          display:
                            'flex',

                          flexDirection:
                            'column',

                          borderRadius: 2,

                          overflow:
                            'hidden',

                          border:
                            '1px solid #e5e7eb',

                          boxShadow:
                            '0 10px 28px rgba(15,23,42,0.07)',

                          transition:
                            'transform 180ms ease',

                          '&:hover':
                            {
                              transform:
                                'translateY(-3px)',
                            },
                        }}
                      >

                        {/* IMAGE */}

                        <Box
                          sx={{
                            position:
                              'relative',

                            bgcolor:
                              '#fff',
                          }}
                        >

                          <CardMedia
                            component="img"
                            image={
                              imageUrl
                            }
                            alt={
                              productName
                            }

                            onError={(
                              e
                            ) => {

                              e.target.src =
                                '/images/shirt.jpg';
                            }}

                            sx={{
                              width:
                                '100%',

                              height: 185,

                              objectFit:
                                'cover',

                              display:
                                'block',
                            }}
                          />

                          {discountPercent >
                            0 && (

                            <Chip
                              icon={
                                <LocalOfferOutlinedIcon />
                              }

                              label={`${discountPercent}% OFF`}

                              size="small"

                              sx={{
                                position:
                                  'absolute',

                                top: 12,

                                left: 12,

                                bgcolor:
                                  '#facc15',

                                color:
                                  '#111827',

                                fontWeight: 800,
                              }}
                            />
                          )}

                        </Box>

                        {/* CONTENT */}

                        <CardContent
                          sx={{
                            p: 2,

                            flex: 1,

                            display:
                              'flex',

                            flexDirection:
                              'column',
                          }}
                        >

                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 900,

                              lineHeight: 1.25,

                              mb: 0.5,
                            }}
                          >
                            {
                              productName
                            }
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mb: 1.25,
                            }}
                          >
                            {brandName}{' '}
                            /{' '}
                            {category}
                          </Typography>

                          {/* CHIPS */}

                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                              mb: 1.5,

                              flexWrap:
                                'wrap',
                            }}
                          >

                            <Chip
                              icon={
                                <StarRoundedIcon />
                              }

                              label={
                                product.rating ||
                                '-'
                              }

                              size="small"
                            />

                            <Chip
                              icon={
                                <Inventory2OutlinedIcon />
                              }

                              label={`${stock} in stock`}

                              size="small"
                            />

                          </Stack>

                          {/* PRICE */}

                          <Box
                            sx={{
                              mt: 'auto',
                            }}
                          >

                            <Stack
                              direction="row"
                              alignItems="baseline"
                              spacing={1}
                            >

                              <Typography
                                variant="h6"
                                sx={{
                                  color:
                                    '#1565c0',

                                  fontWeight: 700,
                                }}
                              >
                                Rs.
                                {
                                  salePrice
                                }
                              </Typography>

                              {discountPrice >
                                0 &&
                                price >
                                  discountPrice && (

                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{
                                    textDecoration:
                                      'line-through',
                                  }}
                                >
                                  Rs.
                                  {
                                    price
                                  }
                                </Typography>
                              )}

                            </Stack>

                            {/* SAVE */}

                            {discountPrice >
                              0 &&
                              price >
                                discountPrice && (

                              <Typography
                                variant="caption"
                                sx={{
                                  color:
                                    '#047857',

                                  fontWeight: 600,

                                  mt: 0.25,

                                  display:
                                    'block',
                                }}
                              >
                                Save
                                Rs.
                                {price -
                                  discountPrice}
                              </Typography>
                            )}

                            {/* BUTTON */}

                            <Button
                              fullWidth

                              variant="contained"

                              startIcon={
                                <ShoppingCartOutlinedIcon />
                              }

                              sx={{
                                mt: 1.5,

                                py: 0.9,

                                borderRadius: 2,

                                bgcolor:
                                  '#0f8a2c',

                                '&:hover':
                                  {
                                    bgcolor:
                                      '#07691f',
                                  },
                              }}
                            >
                              ADD TO CART
                            </Button>

                          </Box>

                        </CardContent>

                      </Card>

                    </Box>
                  );
                }
              )}
        </Box>

        {/* NO PRODUCTS */}

        {!loading &&
          !filteredProducts.length && (

          <Box
            sx={{
              textAlign: 'center',
              py: 8,
            }}
          >

            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
              }}
            >
              No products found
            </Typography>

            <Typography color="text.secondary">
              Search ko thoda
              change karke try
              karo.
            </Typography>

          </Box>
        )}

      </Container>

    </Box>
  );
};

export default Home;